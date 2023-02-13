import React from "react";
import './MenuToggle.css';

 const MenuToggle = (props: any) => {
     const cls: string[] = ['MenuToggle', 'fa',
         props.isOpen ? 'fa-times open' : 'fa-bars'];
     return (
         <i className={cls.join(' ')}
         onClick={props.onToggle}></i>
     )
 }

 export default MenuToggle