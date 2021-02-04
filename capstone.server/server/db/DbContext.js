import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import GroupSchema from '../models/Group'
import BadgeSchema from '../models/Badge'
import MessageSchema from '../models/Message'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Badges = mongoose.model('Badge', BadgeSchema);
  Messages = mongoose.model('Message', MessageSchema);
}

export const dbContext = new DbContext()
