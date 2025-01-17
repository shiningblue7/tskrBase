import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditGroupRoleById($id: Int!) {
    groupRole: groupRole(id: $id) {
      id
      createdAt
      updatedAt
      role
      groupId
      group {
        name
      }
    }
  }
`
const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
      id
    }
  }
`
const UPDATE_GROUP_ROLE_MUTATION = gql`
  mutation UpdateGroupRoleMutation($id: Int!, $input: UpdateGroupRoleInput!) {
    updateGroupRole(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      role
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupRole }) => {
  const [updateGroup, { loading, error }] = useMutation(
    UPDATE_GROUP_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Group Role updated')
        navigate(routes.groupRoles())
      },
    }
  )
  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
    onSave(data, groupRole.id)
  }
  const onSave = (input, id) => {
    if (input?.groupId) {
      input.groupId = parseInt(input.groupId, 10)
    }
    updateGroup({ variables: { id, input } })
  }
  const [deleteGroup] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Group role deleted')
      navigate(routes.users())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete group role ' + id + '?')) {
      deleteGroup({ variables: { id } })
    }
  }
  const fields = [
    {
      prettyName: 'Group',
      name: 'groupId',
      type: 'reference',
      display: 'name',
      value: 'id',
      defaultValue: groupRole.groupId,
      defaultDisplay: groupRole.group.name,
      QUERY: gql`
        query FindReferenceFieldQueryGroupRoles($filter: String, $skip: Int) {
          search: groups(filter: $filter, skip: $skip) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
    {
      name: 'role',
      prettyName: 'Role',
      type: 'select',
      display: 'name',
      value: 'name',
      data: [
        { name: 'userCreate' },
        { name: 'userRead' },
        { name: 'userUpdate' },
        { name: 'userDelete' },
        { name: 'groupCreate' },
        { name: 'groupRead' },
        { name: 'groupUpdate' },
        { name: 'groupDelete' },
        { name: 'groupMemberCreate' },
        { name: 'groupMemberRead' },
        { name: 'groupMemberUpdate' },
        { name: 'groupMemberDelete' },
        { name: 'groupRoleCreate' },
        { name: 'groupRoleRead' },
        { name: 'groupRoleUpdate' },
        { name: 'groupRoleDelete' },
        { name: 'admin' },
      ],
    },
  ]
  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }
  return (
    <FormComponent
      record={groupRole}
      fields={fields}
      roles={roles}
      onSubmit={onSubmit}
      onDelete={onDelete}
      loading={loading}
      error={error}
      returnLink={routes.groupRoles()}
    />
  )
}
