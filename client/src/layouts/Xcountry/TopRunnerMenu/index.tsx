import { useState } from 'react';
import { SubHeader } from '../../../components/Header';
import { TopRunners } from '../../../pages/Xcountry/TopRunners';

const COURSES = [
    {
        name: 'Crytal Springs',
        link: <TopRunners courseId='1' />
    },
    {
        name: 'Toro Park',
        link: <TopRunners courseId='2' />
    },
    {
        name: 'Central Park',
        link: <TopRunners courseId='6' />
    },
    {
        name: 'Baylands Park',
        link: <TopRunners courseId='4' />
    },
    {
        name: 'Lynbrook',
        link: <TopRunners courseId='25' />
    },
]

export const TopRunnerMenu = () => {
    const [ page, setPage ] = useState<any>(undefined);

    const handleCourse = (index: number) => {
        const choice = COURSES[index].link;
        setPage(choice);
    }
 
    return (
    <>
        { !page ? 
        <div className='sub-page-container'>
            <SubHeader title={'Top Runners By Course'} color='transparent' />
            <div>
                {/* list is coming from Runners/styled.css */}
                <ul className='list'> 
                    {COURSES.map((course, index) => {
                        return (
                            <li 
                            onClick={() => handleCourse(index)}
                            key={course.name}>
                                {course.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        :
        <>
            {page}
        </>
        }
    </>
  )
}