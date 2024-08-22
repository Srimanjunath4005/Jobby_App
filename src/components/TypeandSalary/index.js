import './index.css'

const TypeandSalary = props => {
  const {addeType, removeeType, addsType, removesType} = props

  const selecteType = event => {
    const checkbox = event.target
    const isChecked = checkbox.checked
    if (isChecked === true) {
      addeType(event.target.id)
    } else {
      removeeType(event.target.id)
    }
  }

  const selectsType = event => {
    const checkbox = event.target
    const isChecked = checkbox.checked
    if (isChecked === true) {
      addsType(event.target.id)
    } else {
      removesType(event.target.id)
    }
  }

  const renderEmploymentFiltersList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(e => (
      <div className="each-type" key={e.employmentTypeId}>
        <input type="checkbox" id={e.employmentTypeId} onClick={selecteType} />
        <label htmlFor={e.employmentTypeId} className="type">
          {e.label}
        </label>
      </div>
    ))
  }

  const renderSalaryFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(es => (
      <div className="each-type" key={es.salaryRangeId}>
        <input
          type="checkbox"
          className="style-circle"
          id={es.salaryRangeId}
          onClick={selectsType}
        />
        <label htmlFor={es.salaryRangeId} className="type">
          {es.label}
        </label>
      </div>
    ))
  }

  const renderEtypes = () => (
    <div>
      <h1 className="types-heading">Type of Employment</h1>
      <ul className="types-list">{renderEmploymentFiltersList()}</ul>
      <hr className="line-style" />
    </div>
  )

  const renderSrange = () => (
    <div>
      <h1 className="types-heading">Salary Range</h1>
      <ul className="types-list">{renderSalaryFiltersList()}</ul>
    </div>
  )

  return (
    <div className="eands-cont">
      {renderEtypes()}
      {renderSrange()}
    </div>
  )
}

export default TypeandSalary