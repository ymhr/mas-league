import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ isAllowed, ...props }) {
	return isAllowed ? <Route {...props} /> : <Redirect to="/login" />;
}
