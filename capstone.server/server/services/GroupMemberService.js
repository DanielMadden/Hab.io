import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class GroupMemberService {
  async getGroupMembersByGroupId(groupId) {
    return dbContext.GroupMembers.find({groupId: groupId}).populate('memberId')
    
  }
  async create(groupMember) {
    return await dbContext.GroupMembers.create(groupMember)
  }
  async edit(groupMemberId, update, accountId) {
    const groupMember = (await dbContext.GroupMembers.findById(groupMemberId)).toObject()
    if(groupMember.status === 'Moderator'){
      return dbContext.GroupMembers.findOneAndUpdate(groupMemberId, update)
    }
  }
  
  async delete(groupMemberId, accountId) {
    // if not working put a breakpoint and hover over the variables
    const groupMember = await (await dbContext.GroupMembers.findById(groupMemberId)).toObject()
    const group = await (await dbContext.Groups.findById(groupMember.groupId)).toObject()
    const currentGroupMember = await (await dbContext.GroupMembers.findOne({memberId: accountId, groupId: groupMember.id})).toObject()
    if(group.creatorId !== accountId){
      if(groupMember.memberId === accountId || currentGroupMember.status === 'Moderator'){
        return dbContext.GroupMembers.findOneAndRemove(groupMemberId)
      }
      else{
        return new BadRequest("You are not authorized")
      }
    }
    else{
      return new BadRequest("You cannot leave a group you created")
    }
  }
}
export const groupMemberService = new GroupMemberService()