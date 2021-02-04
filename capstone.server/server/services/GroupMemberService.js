import { dbContext } from "../db/DbContext";

class GroupMemberService {
  async create(groupMember) {
    return await dbContext.GroupMembers.create(groupMember)
  }
}
export const groupMemberService = new GroupMemberService()