import FormComponent from 'src/components/FormComponent'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const NewUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    console.log('in newuser onsave', input)
    createUser({ variables: { input } })
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      placeHolder: 'We do propercase this for you',
    },
    {
      name: 'email',
      prettyName: 'Email',
      placeHolder: 'We do send a welcome email on create',
    },
    {
      name: 'hashedPassword',
      prettyName: 'Password',
      placeHolder: 'At least 4 characters',
    },
  ]
  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }
  return (
    <FormComponent
      fields={fields}
      roles={roles}
      onSave={onSave}
      loading={loading}
      error={error}
      returnLink={routes.users()}
    />
  )
}

export default NewUser
