import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateToProjectTab(tabName, projectId) {
  /*
  1. ensure there is no project view mounted, *( I THINK NAVIGATING TO THE PROJECT LIST WIL UNMOUNT THE PROJECT IF THERE IS ONE)
      if there is one then remove it,
      if there is not then do nothing

  2. navigate to the projectlist page
  3. show the project opening and have it open directly onto the tab that is passed in
  4.
  */
}