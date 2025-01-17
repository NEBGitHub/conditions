import React from 'react';
import classNames from 'classnames';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import GreyPipe from '../../components/GreyPipe';
import RegionSummary from '../../components/RegionSummary';
import TrendButton from '../../components/TrendButton';
import { viewTwo } from '../../proptypes';
import SearchBar from '../../components/SearchBar';
import LocationWheelMinimap from '../../components/LocationWheelMinimap';
import FeaturesMenu from '../../components/FeaturesMenu';

import KeywordExplorerButton from '../../components/KeywordExplorerButton';
import './styles.scss';
import TotalConditionsLabel from '../../components/TotalConditionsLabel';
import DotLegend from '../../components/DotLegend';

class ViewTwo extends React.PureComponent {
  static propTypes = viewTwo;

  static defaultProps = {
    layoutOnly: false,
    wheelData: [],
    projectsData: [],
    searchResults: {
      companyIdLookup: {},
      conditionIdLookup: {},
      projectIdLookup: {},
      regionIdLookup: {},
    },
    filteredProjectLookup: {},
  };

  miniMapData = null;

  constructor(props) {
    super(props);
    if (props.selected.region) {
      this.miniMapData = props.wheelData
        .find(region => region.id === props.selected.region);
    }

    // Make sure we grab results if the user came from a shared URL with search params set up
    this.updateSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected.region !== this.props.selected.region
      || prevProps.wheelData !== this.props.wheelData) {
      this.miniMapData = this.props.selected.region
        ? this.props.wheelData.find(region => region.id === this.props.selected.region)
        : null;
    }

    if (this.shouldSearch) {
      this.shouldSearch = false;
      this.updateSearch();
    }
  }

  updateSearch = () => {
    this.props.updateSearch({
      includeKeywords: this.props.included,
      excludeKeywords: this.props.excluded,
      findAny: this.props.findAny,
    }, {
      // If search is in the default state (years = 0), use the dataset's range
      startYear: this.props.projectYear.start || this.props.projectYears.start,
      endYear: this.props.projectYear.end || this.props.projectYears.end,
      statuses: this.props.projectStatus,
    });
  }

  setIncluded = (keywords) => {
    this.props.setIncluded(keywords);
    this.shouldSearch = true;
  };

  setExcluded = (keywords) => {
    this.props.setExcluded(keywords);
    this.shouldSearch = true;
  };

  setFindAny = (value) => {
    this.props.setFindAny(value);
    this.shouldSearch = true;
  };

  setProjectYear = (range) => {
    this.props.setProjectYear(range);
    this.shouldSearch = true;
  };

  setProjectStatus = (statuses) => {
    this.props.setProjectStatus(statuses);
    this.shouldSearch = true;
  };

  render() {
    // TODO: Evil hack. Ideally we would refactor the App's Redux connection to
    // be outside the initial queries so we could update the store when they return.
    if (!this.props.projectYear.start) {
      this.props.setProjectYear(this.props.projectYears);
    }

    const countData = this.props.projectsData.reduce((acc, project) => {
      acc.instrumentCount += project.numberOfInstruments;
      acc.conditionCount += project.numberOfConditions;

      return acc;
    }, { projectCount: this.props.projectsData.length, instrumentCount: 0, conditionCount: 0 });

    return (
      <section className={classNames('ViewTwo', { layoutOnly: this.props.layoutOnly })}>
        <section className="header">
          <SearchBar
            mode={this.props.browseBy}
            availableYearRange={this.props.projectYears}
            availableCategories={this.props.availableCategories}
            setIncluded={this.setIncluded}
            setExcluded={this.setExcluded}
            findAnyOnChange={this.setFindAny}
            updateYear={this.setProjectYear}
            changeProjectStatus={this.setProjectStatus}
            includeKeywords={this.props.included}
            excludeKeywords={this.props.excluded}
            projectStatus={this.props.projectStatus}
            yearRange={this.props.projectYear}
            findAny={this.props.findAny}
            suggestedKeywords={this.props.suggestedKeywords}
            scrollToMethodology={this.props.scrollToMethodology}
          />
          {this.props.browseBy === 'location' ? (
            <LocationWheelMinimap
              region={this.miniMapData}
              className={this.props.wheelMoving ? 'hidden' : ''}
            />
          ) : null}
        </section>

        <section className="wheel">
          <Wheel
            wheelType={this.props.browseBy}
            selectedRay={this.props.browseBy === 'company' ? this.props.selected.company : this.props.selected.region}
            selectRay={this.props.browseBy === 'company' ? this.props.setSelectedCompany : this.props.setSelectedRegion}
            selectProject={this.props.setSelectedProject}
            wheelData={this.props.wheelData}
            wheelMotionTrigger={this.props.setWheelMoving}
            relevantProjectLookup={this.props.searchResults.projectIdLookup}
            filteredProjectLookup={this.props.filteredProjectLookup}
            displayOrder={this.props.displayOrder}
            selectedFeature={this.props.selected.feature}
            searchedRegionsLookup={this.props.searchResults.regionIdLookup}
          />
          <GreyPipe
            mode={this.props.browseBy}
            {...((
              this.props.browseBy === 'company'
              && !(this.props.wheelMoving || this.props.projectMenuLoading)
            )
              ? countData
              : {}
            )}
          />
          {(this.props.browseBy !== 'company') ? null
            : <DotLegend />}
        </section>
        <section className="companyBreakdown">
          {this.props.browseBy === 'location'
            ? (
              <div className="regionChart">
                <RegionSummary
                  selectedAggregatedCount={this.props.selectedAggregatedCount}
                  selectedFeature={this.props.selected.feature}
                  displayOrder={this.props.displayOrder}
                  isHidden={this.props.wheelMoving}
                  companies={this.props.regionCompanyData.companies}
                  activeConditionCompanies={this.props.regionCompanyData.selectedConditionCompanies}
                  selectCompany={this.props.selectRegionCompany}
                  openProjectDetails={this.props.openProjectDetails}
                  isVisible={this.props.wheelMoving ? 'hidden' : ''}
                />
              </div>
            )
            : (
              <>
                <TotalConditionsLabel
                  openNumberDetails={this.props.openNumberDetails}
                />
                <ProjectMenu
                  loading={this.props.wheelMoving || this.props.projectMenuLoading}
                  projectsData={this.props.projectsData}
                  selectedProjectID={this.props.selected.project}
                  onChange={this.props.setSelectedProject}
                  selectedFeature={this.props.selected.feature}
                  relevantProjectLookup={this.props.searchResults.projectIdLookup}
                  filteredProjectLookup={this.props.filteredProjectLookup}
                  displayOrder={this.props.displayOrder}
                />
              </>
            )}
        </section>

        <section className="menus">
          <KeywordExplorerButton
            onClick={this.props.jumpToView1}
          />
          <TrendButton
            onClick={this.props.jumpToView3}
            feature={this.props.selected.feature}
            allConditionsPerYear={this.props.allConditionsPerYear}
            displayOrder={this.props.displayOrder}
          />
        </section>

        <section className="legend">
          <FeaturesMenu
            dropDown
            selected={this.props.selected.feature}
            onChange={this.props.setSelectedFeature}
          />
          <FeaturesLegend
            selectedAggregatedCount={this.props.selectedAggregatedCount}
            selectedFeature={this.props.selected.feature}
            isProjectLegend={this.props.browseBy !== 'location'}
            displayOrder={this.props.displayOrder}
          />
        </section>
      </section>
    );
  }
}

export default ViewTwo;
