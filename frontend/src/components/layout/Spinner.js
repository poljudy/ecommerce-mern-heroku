import spinner from '../../images/spinner.gif'

const Spinner = () => (
  <>
    <img
      src={spinner}
      style={{ width: '125px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
)

export default Spinner
