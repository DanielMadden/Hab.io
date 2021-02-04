import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import GroupSchema from '../models/Group'
import BadgeSchema from '../models/Badge'
import HabitSchema from '../models/Habit'
import FollowSchema from '../models/Follow'
import GroupMemberSchema from '../models/GroupMember'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Badges = mongoose.model('Badge', BadgeSchema);
  Habits = mongoose.model('Habit', HabitSchema);
  Follows = mongoose.model('Follow', FollowSchema);
  GroupMembers = mongoose.model('GroupMember', GroupMemberSchema);
  Messages = mongoose.model('Habit', HabitSchema);
}

export const dbContext = new DbContext()
