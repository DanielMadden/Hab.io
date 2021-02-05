import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class GroupMemberService {
  getGroupMembersByGroupId(groupId) {
    return dbContext.GroupMembers.find({groupId: groupId}).populate('memberId')
    
  }
  async create(groupMember) {
    return await dbContext.GroupMembers.create(groupMember)
  }
  edit(groupMemberId, update, accountId) {
    const groupMember = dbContext.GroupMembers.findById(groupMemberId)
    if(groupMember.status === 'Moderator'){
      return dbContext.GroupMembers.findOneAndUpdate(groupMemberId, update)
    }
  }
  delete(groupMemberId, accountId) {
    // if not working put a breakpoint and hover over the variables
    const groupMember = dbContext.GroupMembers.findById(groupMemberId)
    const group = dbContext.Groups.findById(groupMember.groupId)
    if(group.creatorId !== accountId){
      if(groupMember.memberId === accountId || groupMember.status === 'Moderator'){
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