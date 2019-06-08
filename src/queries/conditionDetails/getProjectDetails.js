// TODO: Port/replace with queries/allInstrumentsBy and a query for project name
import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export default gql`
  query getConditionDetails($projectId: Int!){
    getProjectById(id:$projectId) {
      shortName
      name
      companies {
        name
      }
      instruments {
        id
        name
        prefix
        status
        regions {
          name
          province
        }
        number
        dateSunset
        dateIssuance
        dateEffective
        conditions {
          theme
          phase
          filingRequired
          standardCondition
          status
          id
          textLength
          text
          aggregatedCountArray {
            filing
            filingEnum
            phase
            phaseEnum
            instrument: prefix
            instrumentEnum: prefixEnum
            status
            statusEnum
            theme
            themeEnum
            type
            typeEnum
          }
        }
      }
    }
  }
`;
