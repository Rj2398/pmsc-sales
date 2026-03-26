// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = ({showSidebar}) => {
// 	const location = useLocation();

// 	const menuItems = [
// 		{ name: 'Dashboard', path: '/principal/dashboard', icon: '/images/menu/1.svg' },
// 		{ name: 'Teacher & Students', path: '/principal/teachers-students', icon: '/images/menu/7.svg' },
// 		{ name : 'Progress and Score', path: '/principal/progress-and-score', icon: '/images/menu/3.svg' },
// 		{ name: 'Profile', path: '/principal/profile', icon: '/images/menu/8.svg' }
// 	];

// 	// const isActive = (path) => location.pathname === path;
// 	const isActive = (path) => location.pathname === path || (path === '/principal/dashboard' && location.pathname.startsWith('/principal/subject-detail'));

// 	return (
// 		<section id="sidebar" className={`${showSidebar ? '' : ' hide'}`}>
// 			<Link to="/principal/dashboard" className="brand">
// 				<img src="/images/logo.svg" alt="Brand Logo" />
// 				<img src="/images/coll-logo.svg" alt="" className="collapsed"></img>
// 			</Link>

// 			<ul className="side-menu">
// 				<h2>Navigation</h2>

// 				{menuItems.map((item, index) => (
// 					<li key={index} className={isActive(item.path) ? 'active' : ''}>
// 						<Link to={item.path}>
// 							<img src={item.icon} alt={item.name} />
// 							<span className="text">{item.name}</span>
// 						</Link>
// 					</li>
// 				))}
// 			</ul>
// 		</section>
// 	);
// };

// export default Sidebar;





import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({showSidebar}) => {
	const location = useLocation();

	const menuItems = [
    {
      name: 'Dashboard',
      path: '/principal/dashboard',
      subPath: [
        "/principal/class-detail/",
        "/principal/student-subject-detail/",
        "/principal/student-profile",
        "/principal/student-baseline-assesment",
        "/principal/student-lesson-quiz/",   // Removed :studentId for prefix match
        "/principal/student-summative"
      ],
      icon: '/images/menu/1.svg'
    },
    {
      name: 'Teacher & Students',
      path: '/principal/teachers-students',
      subPath: [
        "/principal/teacher-profile",
        "/teacher/mwl-micro-credentials-domain-training-subject",
        "/principal/students-summative",
        "/principal/student-summative",
        "/principal/student/profile",
        "/principal/students/profile",
        "/principal-student-profiles",
        "/principal/class/detail",
        "/principal/student/subject/detail",
        "/principal/student/baseline/assesment",
        "/principal/student/summative",
        "/principal/student/lesson/quiz",
        "/principal/student-baseline/assesment",
        "/principal/students-summative",
        "/principal/student-lesson/quiz",
        "/principal-student-baseline/assesment",
        "/principal-student-summative",
        "/principal-student-lesson/quiz",

      ],
      icon: '/images/menu/7.svg'
    },
    {
      name: 'Completion & Score',
      path: '/principal/progress-and-score',
      icon: '/images/menu/3.svg',
      subPath: [
        "/principal/progress-student-summative-assessment",
        "/principal/progress-student-baseline-assessment",
        "/principal/progress-student-lesson-quiz",
      ],
    },
    {
      name: 'Profile',
      path: '/principal/profile',
      icon: '/images/menu/8.svg'
    }
  ];

	// const isActive = (path) => location.pathname === path;
	// const isActive = (path) => location.pathname === path || (path === '/principal/dashboard' && location.pathname.startsWith('/principal/subject-detail'));


const isActive = (item) => {
  if (!item || typeof item !== 'object') return false;

  const currentPath = location.pathname;

  // Normalize paths by trimming spaces (to avoid malformed matches)
  const itemPath = item.path?.trim();

  // 1. Exact match
  if (currentPath === itemPath) return true;

  // 2. Match any defined subPath (prefix match)
  if (Array.isArray(item.subPath)) {
    return item.subPath.some(sub =>
      currentPath.startsWith(sub.trim().replace(/:.*$/, '')) // strip dynamic params
    );
  }

  return false;
};



	return (
		<section id="sidebar" className={`${showSidebar ? '' : ' hide'}`}>
			<Link to="/principal/dashboard" className="brand">
				<img src="/images/logo.svg" alt="Brand Logo" />
				<img src="/images/coll-logo.svg" alt="" className="collapsed"></img>
			</Link>

			<ul className="side-menu">
				<h2>Navigation</h2>

				{menuItems.map((item, index) => (
					<li key={index} className={isActive(item) ? 'active' : ''}>
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

