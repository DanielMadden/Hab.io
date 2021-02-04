import { dbContext } from "../db/DbContext";

class GroupMemberService {
  delete(groupMemberId, accountId) {
    throw new Error("Method not implemented.");
  }
  edit(groupMemberId, status, accountId) {
    throw new Error("Method not implemented.");
  }
  getGroupMembersByGroupId(groupId) {
    return dbContext.GroupMembers.find({groupId: groupId}).populate('memberId')

  }
  async create(groupMember) {
    return await dbContext.GroupMembers.create(groupMember)
  }
}
export const groupMemberService = new GroupMemberService()