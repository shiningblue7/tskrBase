import { useQuery } from '@apollo/client'
import { SelectField } from '@redwoodjs/forms'
import { useState } from 'react'

const ReferenceField = ({ field }) => {
  console.log(field)
  let defaultOption = (
    <>
      {field.defaultValue && field.defaultDisplay && (
        <option value={field.defaultValue}>{field.defaultDisplay}</option>
      )}
    </>
  )
  let [filterString, setFitlerString] = useState('')
  const { loading, error, data, refetch } = useQuery(field.QUERY, {
    variables: {
      filter: filterString || '',
      //q: params.get('q'),
      //filter: props.fuzzyQuery || params.get('filter'),
      skip: /*props.skip ||*/ 0,
      take: /*props.take ||*/ 10,
      //orderBy: props.orderBy || params.get('orderBy'),
    },
  })
  let handleSearchResult = () => {
    //refetch()
  }
  //console.log(field.defaultValue, field.defaultDisplay)
  let input = (
    <>
      <input
        name={'reference.' + field.name}
        defaultValue={filterString}
        placeholder={'type a name here to filter...'}
        onBlur={(event) => {
          setFitlerString(event.target.value)
        }}
        onChange={() => {}}
      />
      <br />
    </>
  )
  if (loading) {
    console.log('loading')
    return <p>Loading Lazy Data</p>
  }
  if (error) {
    console.log('error', error)
    return <p>`Error! ${error}`</p>
  }
  if (data) {
    handleSearchResult(data)
    console.log(data)
  }
  let options = data.search.results.map((option) => {
    try {
      if (option[field.value] !== field.defaultValue) {
        return (
          <option key={option.id} value={option[field.value]}>
            {option[field.display]}
          </option>
        )
      }
    } catch (error) {
      console.log(error)
    }
  })
  let html = (
    <SelectField defaultValue={field.defaultValue} name={field.name}>
      <option>Pick one</option>
      {defaultOption}
      {options}
    </SelectField>
  )
  return (
    <div>
      {input}
      {html}
    </div>
  )
  //  return <p>{input}</p>
}

export default ReferenceField
