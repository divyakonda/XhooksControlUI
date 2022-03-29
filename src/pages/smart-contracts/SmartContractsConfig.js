import React from 'react';
import { authRoles } from '../../store/auth';

const SmartContractsConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/new_smart_contract',
      component: React.lazy(() => import('./SmartContract'))
    }
  ]
};

export default SmartContractsConfig;
