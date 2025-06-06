/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2020 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@patternfly/react-core/dist/esm/components/Button/index.js";
import { Nav, NavItem, NavList } from "@patternfly/react-core/dist/esm/components/Nav/index.js";
import { ExclamationCircleIcon } from '@patternfly/react-icons';

import cockpit from "cockpit";
import { Icon } from "@patternfly/react-core";

const _ = cockpit.gettext;

export const service_tabs_suffixes = ["service", "target", "socket", "timer", "path"];

/*
 * React component showing services tabs
 * Required props:
 *  - onChange:
 *      When different tab is selected this callback is called
 */
export function ServiceTabs({ onChange, activeTab, tabErrors }) {
    const service_tabs = {
        service: _("Services"),
        target: _("Targets"),
        socket: _("Sockets"),
        timer: _("Timers"),
        path: _("Paths")
    };

    const [activeItem, setActiveItem] = useState(activeTab);

    return (
        <Nav variant="horizontal-subnav" id="services-filter"
             onSelect={(_event, result) => { setActiveItem(result.itemId); onChange(result.itemId) }}>
            <NavList>
                {Object.keys(service_tabs).map(key => {
                    return (
                        <NavItem itemId={key}
                                 key={key}
                                 preventDefault
                                 isActive={activeItem == key}>
                            <Button variant="link" component="a">
                                {service_tabs[key]}
                                {tabErrors[key] ? <Icon status="danger"><ExclamationCircleIcon className="ct-exclamation-circle" /></Icon> : null}
                            </Button>
                        </NavItem>
                    );
                })}
            </NavList>
        </Nav>
    );
}
ServiceTabs.propTypes = {
    onChange: PropTypes.func.isRequired,
};
