import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({showSidebar}) => {
	const location = useLocation();

	const menuItems = [
		{ name: 'Dashboard', path: '/teacher/dashboard',
			subPath : ["/teacher/class-detail/", "/teacher/subject-detail/", "/teacher/student-profile", "/teacher/student-baseline-assessment", "/teacher/student-lesson-quiz", "/teacher/student-summative-assessment"], icon: '/images/menu/1.svg' },
		{ name: 'Completion & Score', path: '/teacher/progress-and-score', icon: '/images/menu/3.svg' },
		{ name: 'MWL Library', path: '/teacher/mwl-library', 
			subPath: ["/teacher/mwl-training", "/teacher/mwl-micro-credentials-domain-training-subject"], icon: '/images/menu/5.svg' },
		{ name: 'Profile', path: '/teacher/profile', icon: '/images/menu/4.svg' }
	];

	// const isActive = (path) => location.pathname === path;
	const isActive = (item) => {
		if (location.pathname === item.path) return true; // Exact match
		if (item.subPath && Array.isArray(item.subPath)) {
			return item.subPath.some(subPath => location.pathname.startsWith(subPath)); // Match any subPath if defined
		}

		return false;
	};

	return (
		<section id="sidebar" className={`${showSidebar ? '' : ' hide'}`}>
			<Link to="/teacher/dashboard" className="brand">
				<img src="/images/logo.svg" alt="Brand Logo" />
				<img src="/images/coll-logo.svg" alt="" className="collapsed"></img>
			</Link>

			<ul className="side-menu">
				<h2>Navigation</h2>

				{menuItems.map((item, index) => (
					<li key={index} className={(isActive(item)) ? 'active' : ''}>
						<Link to={item.path}>
							<img src={item.icon} alt={item.name} />
							<span className="text">{item.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Sidebar;
