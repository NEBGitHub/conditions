import gql from 'graphql-tag';
import { THEME_FRAGMENT, STATUS_FRAGMENT, TYPE_FRAGMENT, FILING_FRAGMENT, PHASE_FRAGMENT } from '../featuresFragments';

export const companyWheelQuery = gql`
  query companies {
    allCompanies {
      id
      name
      projectIds
    }
  }
`;

export const locationWheelQuery = gql`
  query regions {
    allRegions {
      id
      name {
        en
      }
      province {en}
      aggregatedCount {
        ...theme
        ...status
        ...type
        ...filing
        ...phase
      }
    }
  }

  ${THEME_FRAGMENT}
  ${STATUS_FRAGMENT}
  ${TYPE_FRAGMENT}
  ${FILING_FRAGMENT}
  ${PHASE_FRAGMENT}
`;
