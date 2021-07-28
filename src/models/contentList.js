import ContentProviderItem from "./ContentProviderItem";


class ContentList {
  constructor (props, index) {
    this.id = props?.id
    this.status = props?.status
    this.name = props?.title
    this.type = props?.type
    this.updated_at = props?.updated_at
    this.contentProviders = props?.content_providers.length > 0
      ? (props?.content_providers || []).map((item => new ContentProviderItem(item)))
      : [
          {adsGroups: [
            {}
            ]
          }
        ]
  }
}
export default ContentList
