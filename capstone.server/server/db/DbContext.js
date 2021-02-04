import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import GroupSchema from '../models/Group'
import BadgeSchema from '../models/Badge'
import HabitSchema from '../models/Habit'
import FollowSchema from '../models/Follow'
import GroupMemberSchema from '../models/GroupMember'
import MessageSchema from '../models/Message'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Badges = mongoose.model('Badge', BadgeSchema);
<<<<<<< HEAD
  Habits = mongoose.model('Habit', HabitSchema);
  Follows = mongoose.model('Follow', FollowSchema);
  GroupMembers = mongoose.model('GroupMember', GroupMemberSchema);
  Messages = mongoose.model('Habit', HabitSchema);
=======
  Messages = mongoose.model('Message', MessageSchema);
>>>>>>> c8e8f091d625755334b087e8b84deb375141428c
}

export const dbContext = new DbContext()
