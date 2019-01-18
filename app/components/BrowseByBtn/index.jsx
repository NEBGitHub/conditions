import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

import handleInteraction from '../../utilities/handleInteraction';

const BrowseByBtn = (props) => {
  const message = props.browseByCompany ? ['projectsBy', 'company'] : ['conditionsBy', 'location'];

  const background = (
    <svg height="41.33px" width="41.33px" className="BrowseByBtn-Wheel">
      <defs>
        <clipPath xmlns="http://www.w3.org/2000/svg" id="clip-path"><circle cx="229.72368" cy="44.91539" r="16.166" fill="none" /></clipPath>
        <clipPath xmlns="http://www.w3.org/2000/svg" id="clip-path-3"><path d="M229.7238,65.581c-.626,0-1.2583-.02832-1.87939-.085l.81152-8.96289a12.10745,12.10745,0,0,0,2.16162-.002l.82813,8.96094C231.01091,65.55173,230.36442,65.581,229.7238,65.581Zm-5.62939-.77832a20.58184,20.58184,0,0,1-3.56348-1.377l4.01074-8.05664a11.61065,11.61065,0,0,0,2.001.77344Zm11.30176-.01074-2.46777-8.6543a11.66106,11.66106,0,0,0,2.001-.77832l4.02344,8.05078A20.54793,20.54793,0,0,1,235.39616,64.792Zm-18.10693-3.36914a20.74236,20.74236,0,0,1-2.81689-2.5625l6.64258-6.07227a11.812,11.812,0,0,0,1.59521,1.45117Zm24.90137-.02441L236.757,54.22263a11.76546,11.76546,0,0,0,1.59375-1.45508l6.65039,6.06445A20.84919,20.84919,0,0,1,242.19059,61.39841ZM212.17106,55.8281a20.70023,20.70023,0,0,1-1.708-3.4082l8.38477-3.27148a11.62618,11.62618,0,0,0,.96289,1.92188Zm35.12646-.03613-7.64844-4.74219a11.67372,11.67372,0,0,0,.959-1.9248l8.3916,3.25391A20.64243,20.64243,0,0,1,247.29753,55.792Zm-37.88477-7.043a20.83977,20.83977,0,0,1-.355-3.791l9-.01758a11.76228,11.76228,0,0,0,.20068,2.14648Zm40.62939-.04395-8.84863-1.64258a11.79437,11.79437,0,0,0,.19629-2.14746l7.84717-.05859,1.15234.00293A20.90312,20.90312,0,0,1,250.04216,48.70506Zm-31.792-5.91406-8.85254-1.623a20.581,20.581,0,0,1,1.03418-3.67383l8.39941,3.23047A11.6016,11.6016,0,0,0,218.25016,42.791Zm22.93408-.07227a11.57424,11.57424,0,0,0-.59424-2.06055l8.37793-3.28711a20.5969,20.5969,0,0,1,1.05811,3.668Zm-21.39941-3.918-7.6582-4.72656a20.71109,20.71109,0,0,1,2.28955-3.04395l6.66406,6.04883A11.81428,11.81428,0,0,0,219.78483,38.80076Zm19.83691-.0625a11.69171,11.69171,0,0,0-1.3042-1.71289l6.626-6.08984a20.75265,20.75265,0,0,1,2.31006,3.03125Zm-16.9502-3.11719L217.22233,28.457a20.72237,20.72237,0,0,1,3.23633-2.01855l4.03516,8.04492A11.52708,11.52708,0,0,0,222.67155,35.62107Zm14.05029-.042a11.85456,11.85456,0,0,0-1.83545-1.12988l3.98926-8.06641a20.71039,20.71039,0,0,1,3.24365,1.99512Zm-10.22461-1.88086L224.009,25.04978a20.62037,20.62037,0,0,1,3.752-.71l.84375,8.96094A11.562,11.562,0,0,0,226.49723,33.69822Zm6.38721-.0166a11.72865,11.72865,0,0,0-2.11621-.38672l.791-8.96484a20.7184,20.7184,0,0,1,3.75.68359Z" fill="none" clipPath="url(#clip-path)" /></clipPath>
      </defs>
      <g transform="translate(-209,-25)" xmlns="http://www.w3.org/2000/svg" clipPath="url(#clip-path-3)">
        <path d="M229.72367,28.74937A16.15971,16.15971,0,0,0,213.569,44.6901a4.64806,4.64806,0,0,1,.682-.0119,8.36511,8.36511,0,0,1,4.22766-.1532c.45422.05676.72705.666.2525.93164a2.19442,2.19442,0,0,1,.3963.68549.43647.43647,0,0,1-.42072.59564.50171.50171,0,0,1-.17853.85272,7.45805,7.45805,0,0,1-2.25848.24951.52014.52014,0,0,1-.45776.435,3.36522,3.36522,0,0,1-1.94061-.19812,16.05186,16.05186,0,0,0,.759,2.62061q.53339-.21625,1.08362-.382a.51356.51356,0,0,1,.29846-.68927,6.72267,6.72267,0,0,1,1.38239-.39618,18.33414,18.33414,0,0,1,2.36761-.85382c.62994-.20337.84.72461.26581.96429-.0686.02863-.13818.05072-.20685.07892.34784.17181.69238.352,1.03369.5368a.40938.40938,0,0,1,.18811.10266c.17334.09558.34937.18469.52118.28442a.49421.49421,0,0,1-.04511.8714.50093.50093,0,0,1-.32434.37579c-.21735.08185-.43933.15466-.66309.22418a.53811.53811,0,0,1-.1991.54169c.10583-.05646.19879-.13165.31024-.17975a.59506.59506,0,0,1,.37958-.03381c.09277-.09991.17041-.207.26923-.30469a.50413.50413,0,0,1,.83569.48651c-.0202.09943-.06055.179-.0874.27185.04706-.0174.09137-.0365.139-.05359a.50467.50467,0,0,1,.61505.34924,1.66419,1.66419,0,0,1,.04559.238.47627.47627,0,0,1,.08331.52753.51246.51246,0,0,1,.15918.80426c-.05969.06525-.12567.12469-.18768.18781a.45948.45948,0,0,1-.01709.09161,5.84046,5.84046,0,0,1-2.702,2.94684c-.03528.05884-.07349.11511-.10883.17389a16.16,16.16,0,1,0,9.657-29.11267Z" fill="#fff" /><path d="M229.7238,24.249a20.666,20.666,0,1,0,20.666,20.666A20.68913,20.68913,0,0,0,229.7238,24.249Zm0,32.332a11.56522,11.56522,0,0,1-6.65692-2.10376c-.05566.05914-.11536.1145-.1723.17242a.45948.45948,0,0,1-.01709.09161,5.84046,5.84046,0,0,1-2.702,2.94684c-.22113.36847-.44128.7384-.68176,1.08923a.50244.50244,0,0,1-.91388-.38525,4.32932,4.32932,0,0,1,.34686-.9491.51289.51289,0,0,1-.53137-.50134c.00574-.06036.02637-.1095.03564-.16718-.03271.03467-.06842.06927-.09875.10406-.37567.43054-1.0918-.13544-.78534-.6059.02332-.03583.05444-.06573.07892-.10065l-.00073-.00055.0061-.00629a4.31931,4.31931,0,0,1,.29883-.3811.458.458,0,0,1-.21643-.6781,9.83246,9.83246,0,0,1,1.18225-1.63171c-.07-.04645-.13281-.09344-.19427-.14062a27.01894,27.01894,0,0,1-2.55389,1.28979c-.43384.18781-.953-.2135-.68408-.68414a3.53882,3.53882,0,0,1,.28534-.41876.51257.51257,0,0,1-.36865-.74786c.04425-.07245.10278-.12909.15125-.197-.36218.11615-.72351.23456-1.08661.34808a.51737.51737,0,0,1-.56171-.75641l-.02161.00641a.50229.50229,0,0,1-.38531-.91382,10.1175,10.1175,0,0,1,2.23767-.94452.51356.51356,0,0,1,.29846-.68927,6.72267,6.72267,0,0,1,1.38239-.39618,10.91729,10.91729,0,0,1,1.31714-.51538c-.12341-.35693-.23492-.71924-.32379-1.09076a7.70651,7.70651,0,0,1-2.11841.21613.52014.52014,0,0,1-.45776.435c-.91217.10223-1.99115.14026-2.51508-.74762a.47752.47752,0,0,1,.01428-.51044,5.16178,5.16178,0,0,1-.54877-.09314.50235.50235,0,0,1,.13293-.98212c.16046-.00543.32068-.00073.48108-.00244a.51305.51305,0,0,1-.12982-.30029c-.47125-.17181-.23413-.88861.23206-.94727a4.361,4.361,0,0,1,.77234-.01349,7.51426,7.51426,0,0,1,3.829-.20319A11.65916,11.65916,0,1,1,229.7238,56.581Z" fill="#a1a8a7" />
      </g>
    </svg>
  );

  return (
    <button type="button" className="BrowseByBtn" {...handleInteraction(props.onClick)}>
      <div className="BrowseByBtn-ButtonText">
        <FormattedMessage id={`views.view1.footer.${message[0]}`} />
        <span>&nbsp;</span>
        <FormattedMessage id={`views.view1.footer.${message[1]}`}>
          { text => (<span className="LastWord">{text}</span>) }
        </FormattedMessage>
      </div>
      {background}
    </button>
  );
};

BrowseByBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  browseByCompany: PropTypes.bool,
  browseByLocation: PropTypes.bool,
};

BrowseByBtn.defaultProps = {
  browseByCompany: false,
  browseByLocation: false,
};

export default BrowseByBtn;

