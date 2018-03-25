import cn from './Flex.css';
import React from 'react';

export default ({props, children}) => <div className={cn.flex} {...props}>{children}</div>;
