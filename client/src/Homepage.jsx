import './Homepage.css';
import SideNav from './navigation/SideNav';
import Timeline from './timeline/Timeline';

function Homepage() {
  return (
    <div className='homepage'>
      <div className='home_sidebar'>
        <SideNav />
      </div>
      <div className='home_timeline'>
      <Timeline />
      </div>
    </div>
  )
}

export default Homepage;
