import React from 'react';

import RouteForm from './containers/RouteForm';
import RouteList from './containers/RouteList';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">Маршрут</div>
            <div className="sidebar-content">
                <RouteForm />
                <RouteList />
            </div>
        </div>
    );
};

export default Sidebar;
