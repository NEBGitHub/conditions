import gql from 'graphql-tag';

const instrumentFields = `
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
  documents {
    documentId
  }
  conditions {
    theme
    phase
    filingRequired
    standardCondition
    status
    id
    textLength
    text
    aggregatedCount {
      filing { name, count }
      phase { name, count }
      instrument { name, count }
      status { name, count }
      theme { name, count }
      type { name, count }
    }
  }
`;

export const project = gql`
  query allInstrumentsByProject($id: Int!) {
    allInstrumentsByProject(projectId: $id) {
      ${instrumentFields}
    }
  }
`;

export const region = gql`
  query allInstrumentsByRegion($id: Int!) {
    allInstrumentsByRegion(regionId: $id) {
      ${instrumentFields}
    }
  }
`;
