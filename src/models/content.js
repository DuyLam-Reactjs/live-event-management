import {parsedTimeCreate} from "../helpers/common";


class Content {
  constructor (props, index) {
    this.index = index
    this.created_at = parsedTimeCreate(props?.created_at)
    this.description = props?.description
    this.id = props?.id
    this.is_default = props?.is_default
    this.name = props?.name
    this.status = props?.status
    this.total_content = props?.total_content
  }
}

export default Content
