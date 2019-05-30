import gql from 'graphql-tag';

export default gql`
  query getKeywordConditions($keywords: [String]!) {
    findSearchResults(
      includeKeywords: $keywords,
      language: "en" # TODO: Check the app's locale
    ) {
      conditionIds
    }
  }
`;