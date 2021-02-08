export default class GroupImage {
  constructor(data) {
    this.name = data.alt_description
    this.imageURL = modifyURL(data.urls.small)
    this.photohrapher = data.user.name
    this.color = data.color
  }
}
function modifyURL(url) {
  url = url.slice(0, -8)
  url += '100&w=400'
  return url
}
