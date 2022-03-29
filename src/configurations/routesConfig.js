import React from 'react';
import Utils from '../utils';
import HomeConfig from '../pages/home/HomeConfig';
import SmartContractsConfig from '../pages/smart-contracts/SmartContractsConfig';
import { Redirect } from 'react-router-dom';

const routeConfigs = [HomeConfig, SmartContractsConfig];

const routes = [
  ...Utils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    // component: React.lazy(() => import('../pages/home/Home')),
    component: () => <Redirect to="/home" />,
    settings: {
      layout: {
        config: {
          navbar: {
            display: false
          },
          toolbar: {
            display: true
          },
          footer: {
            display: true
          },
          leftSidePanel: {
            display: false
          },
          rightSidePanel: {
            display: false
          }
        }
      }
    }
  }
];

export default routes;
