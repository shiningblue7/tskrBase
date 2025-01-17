import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'
import {
  executeBeforeCreateRules,
  executeAfterCreateRules,
  executeBeforeReadAllRules,
  executeAfterReadAllRules,
  executeBeforeReadRules,
  executeAfterReadRules,
  executeBeforeUpdateRules,
  executeAfterUpdateRules,
  executeBeforeDeleteRules,
  executeAfterDeleteRules,
} from 'src/lib/rules'
let table = 'groupRole'
export const createGroupRole = async ({ input }) => {
  try {
    let result = await executeBeforeCreateRules(table, {
      input,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let record = await db[table].create({
      data: result.input,
    })
    let afterResult = await executeAfterCreateRules(table, {
      record,
    })
    return afterResult.record
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const groupRoles = async ({ orderBy, filter, skip }) => {
  try {
    let preferences = context.currentUser.preferences
    let take = (() => {
      let limit =
        parseInt(preferences['groupRole.pageSize'], 10) ||
        parseInt(preferences['pageSize'], 10) ||
        10
      if (limit > 100) {
        return 100 //return 100 or limit whatever is smaller
      } else {
        return limit
      }
    })()
    let where = (() => {
      if (filter) {
        let OR = [
          { group: { name: { contains: filter, mode: 'insensitive' } } },
          { role: { contains: filter, mode: 'insensitive' } },
        ]
        let castFilter = parseInt(filter, 10)
        if (isNaN(castFilter) === false) {
          OR.push({ group: { id: { equals: castFilter } } })
          OR.push({ id: { equals: castFilter } })
        }
        return { OR }
      } else {
        return {}
      }
    })()
    if (!skip) skip = 0
    let result = await executeBeforeReadAllRules(table, {
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let readRecords = await db[table].findMany({ take, where, orderBy, skip })
    let count = await db[table].count({ where })
    let results = { results: readRecords, count, take, skip }
    readRecords = executeAfterReadAllRules(table, readRecords)
    return results
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const groupRole = async ({ id }) => {
  try {
    let result = await executeBeforeReadRules(table, {
      id,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let readRecord = await db[table].findUnique({
      where: { id },
    })
    readRecord = executeAfterReadRules(table, readRecord)
    return readRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const updateGroupRole = async ({ id, input }) => {
  try {
    let result = await executeBeforeUpdateRules(table, {
      id,
      input,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let updatedRecord = await db[table].update({
      data: result.input,
      where: { id },
    })
    updatedRecord = executeAfterUpdateRules(table, updatedRecord)
    return updatedRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const deleteGroupRole = async ({ id }) => {
  try {
    let result = await executeBeforeDeleteRules(table, {
      id,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let deletedRecord = await db[table].delete({
      where: { id },
    })
    deletedRecord = executeAfterDeleteRules(table, deletedRecord)
    return deletedRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const groupRolesByGroup = async ({ id, orderBy, filter, skip }) => {
  //return db.groupRole.findMany({
  //  where: { group: id },
  //})
  try {
    let preferences = context.currentUser.preferences
    let take = (() => {
      let limit = parseInt(preferences['user.pageSize'], 10) || 10
      if (limit > 100) {
        return 100 //return 100 or limit whatever is smaller
      } else {
        return limit
      }
    })()
    let where = (() => {
      if (filter) {
        let OR = [
          { group: { name: { contains: filter, mode: 'insensitive' } } },
          { role: { contains: filter, mode: 'insensitive' } },
        ]
        let castFilter = parseInt(filter, 10)
        if (isNaN(castFilter) === false) {
          OR.push({ group: { id: { equals: castFilter } } })
          OR.push({ id: { equals: castFilter } })
        }
        return { AND: [{ OR }, { groupId: { equals: id } }] }
      } else {
        return {}
      }
    })()
    if (!skip) skip = 0
    let result = await executeBeforeReadAllRules(table, {
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let readRecords = await db[table].findMany({ take, where, orderBy, skip })
    let count = await db[table].count({ where })
    let results = { results: readRecords, count, take, skip }
    readRecords = executeAfterReadAllRules(table, readRecords)
    return results
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const GroupRole = {
  group: (_obj, { root }) =>
    db.groupRole.findUnique({ where: { id: root.id } }).group(),
}
