import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import GroupSchema from '../models/Group'
import BadgeSchema from '../models/Badge'
import HabitSchema from '../models/Habit'
import FollowSchema from '../models/Follow'
import GroupMemberSchema from '../models/GroupMember'
import MessageSchema from '../models/Message'
import HabitHistorySchema from '../models/HabitHistory'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Badges = mongoose.model('Badge', BadgeSchema);
  Habits = mongoose.model('Habit', HabitSchema);
  Follows = mongoose.model('Follow', FollowSchema);
  GroupMembers = mongoose.model('GroupMember', GroupMemberSchema);
  Messages = mongoose.model('Message', MessageSchema);
  HabitHistory = mongoose.model('HabitHistory', HabitHistorySchema);
}

export const dbContext = new DbContext()
