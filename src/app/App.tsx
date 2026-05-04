import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ConnectionScreen } from './components/ConnectionScreen';
import { InitialSetupScreen } from './components/InitialSetupScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { RecipeLibraryScreen } from './components/RecipeLibraryScreen';
import { RecipeEditorScreen } from './components/RecipeEditorScreen';
import { ContainerManagementScreen } from './components/ContainerManagementScreen';
import { DispensingScreen } from './components/DispensingScreen';

export default function App() {
  return (
    <BrowserRouter>
      <div className="size-full bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md h-full bg-white shadow-xl overflow-auto">
          <Routes>
            <Route path="/" element={<ConnectionScreen />} />
            <Route path="/setup" element={<InitialSetupScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/recipes" element={<RecipeLibraryScreen />} />
            <Route path="/recipes/new" element={<RecipeEditorScreen />} />
            <Route path="/recipes/edit/:id" element={<RecipeEditorScreen />} />
            <Route path="/containers" element={<ContainerManagementScreen />} />
            <Route path="/dispensing" element={<DispensingScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}