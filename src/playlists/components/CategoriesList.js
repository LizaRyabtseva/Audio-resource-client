import React from 'react';
import CategoryItem from "../../admin/components/CategoryItem";
import firstLetterCaps from "../../shared/util/firstLetterCaps";

const CategoriesList = props => {
    return (
        <div className={'d-flex flex-wrap justify-content-around'} style={{width: '60%', marginLeft: '12rem', paddingTop: '2rem'}}>
            <ul className={'list-group list-group-horizontal'}>
                <li style={{listStyle: "none"}}></li>
                {props.categories.map(c => (
                    <CategoryItem id={c._id} key={c._id} title={firstLetterCaps(c.title)} to={`/api/categories/${c._id}`}/>
                ))}
                <li style={{listStyle: "none"}}></li>
            </ul>
        </div>
    )
}

export default CategoriesList;