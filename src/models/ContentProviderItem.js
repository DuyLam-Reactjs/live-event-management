import AdsGroupsList from "./AdsGroupsList";



class ContentProviderItem {
  constructor (props) {
    this.adsGroups = props?.ads_groups
    ? (props?.ads_groups || []).map(item => new AdsGroupsList(item))
    : [{}]
    this.id = props?.id
    this.name = props.name
  }
}

export default ContentProviderItem
