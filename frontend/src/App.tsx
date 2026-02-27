import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./page/dashboard";
import { BookOpen, GraduationCap, Home, List } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./page/subjects/list";
import Subjectcreate from "./page/subjects/create";
import ClassesList from "./page/classes/list";
import ClassesCreate from "./page/classes/create";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "pTdTWo-7oEkJO-aVJBEw",
              }}
              resources={[{
                name: 'dashboard',
                list: '/',
                meta: { label: 'Home', icon: <Home />}
              },
              {
                name: 'subjects',
                list: '/subjects',
                create: '/subjects/create',
                meta: { label: 'Subjects', icon: <BookOpen />}
              },
              {
                name: 'classes',
                list: '/classes',
                create: '/classes/create',
                meta: { label: 'Classes', icon: <GraduationCap />}
              }
              ]}
            >

              <Routes>
                <Route element={
                  <Layout> <Outlet/> </Layout>
                }>
                <Route path="/" element={<Dashboard />} />
                <Route path="/subjects" >
                  <Route index element={<SubjectList />} />
                  <Route path="create" element={<Subjectcreate />} />
                </Route>
                
                <Route path="/classes" >
                  <Route index element={<ClassesList />} />
                  <Route path="create" element={<ClassesCreate />} />
                </Route>

                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );                        
}

export default App;
