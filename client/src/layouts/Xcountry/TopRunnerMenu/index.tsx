import { useState } from 'react';
import { TopRunners } from '../../../pages/Xcountry/TopRunners';
import './styled.css'
import useActiveLink from '../../../helpers/hooks/useActiveLink';

const COURSES = [
    {
        name: 'Crytal Springs',
        courseId: 1
    },
    {
        name: 'Toro Park',
        courseId: 2
    },
    {
        name: 'Central Park',
        courseId: 6
    },
    {
        name: 'Baylands Park',
        courseId: 4
    },
    {
        name: 'Lynbrook',
        courseId: 25
    },
]

export const TopRunnerMenu = () => {
    const { isActive, toggleActive } = useActiveLink('Crytal Springs');
    const [ activeRank, setActiveRank ] = useState<number>(1);

    const handleClick = (course: {
        name: string;
        courseId: number;
    }) => {
        toggleActive(course.name);
        setActiveRank(course.courseId);
    }
 
    return (
        <div className="xc-top-runner-page">
            <div className="top-container">
                <div className="xc-athlete-header">
                    <p>Cross Country <span>{'>'}</span> Top Runners <span>{'>'}</span></p>
                    <h1>Top 25 Ranked Runners</h1>
                </div>
                <div className="xc-athlete-desc">
                    <p>Below is every cross country athlete that is on record. If you have a specific athlete you want to find, you can use the search bar below. If a record is missing, <span>please contact admin</span>.</p>
                </div>
                <ul className='ranked-area'> 
                    {COURSES.map((course, index) => {
                        return (
                            <li 
                            className={isActive(course.name) ? 'active' : ''}
                            onClick={() => handleClick(course)}
                            key={course.name}>
                                {course.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <TopRunners courseId={activeRank} />
        </div>
    // <>
    //     { !page ? 
    //     <div className='sub-page-container'>
    //         <SubHeader title={'Top Runners By Course'} color='transparent' />
    //         <div>
    //             {/* list is coming from Runners/styled.css */}
    //             <ul className='list'> 
    //                 {COURSES.map((course, index) => {
    //                     return (
    //                         <li 
    //                         onClick={() => handleCourse(index)}
    //                         key={course.name}>
    //                             {course.name}
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //     </div>
    //     :
    //     <>
    //         {page}
    //     </>
    //     }
    // </>
  )
}