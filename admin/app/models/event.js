import BaseModel from './base-model'

class Event extends BaseModel {

  static get statusOptions() {
    return {
      DRAFT: 'Draft',
      REVIEW: 'In Review',
      PUBLISHED: 'Published'
    }
  }

  constructor() {
    super()
    this.title = ''
    this.description = ''
    this.startDate = ''
    this.endDate = ''
    this.tags = []
    this.topics = []
    this.status = Event.statusOptions.DRAFT
    this.availableSeats = -1
  }
}

export default Event
