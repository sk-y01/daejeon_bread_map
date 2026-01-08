import React from 'react'

const REGIONS = ['서구', '중구', '동구', '대덕구', '유성구']

const FilterChips = ({ selected, onChange }) => {
  return (
    <div className="filter-chips">
      {REGIONS.map(region => (
        <button
          key={region}
          type="button"
          className={`btn ${
            selected === region
              ? 'btn__sub--rounded'
              : 'btn__light--rounded'
          }`}
          onClick={() => onChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  )
}

export default FilterChips
