### Employee Management System

Full-Stack Application (React + Redux | Node.js + GraphQL | MongoDB)

## Overview

The Employee Management System is a full-stack web application developed as part of a technical assignment.
It demonstrates modern frontend and backend development practices using React, Redux Toolkit, Node.js, GraphQL, and MongoDB.

The application allows users to view, manage, and update employee data with role-based authentication and authorization.

## Features

# Frontend (React + Redux)

Horizontal navigation bar with hamburger menu and one-level submenu

Tile View and Grid View (10-column table) for employee data

Employee tiles with actions:

Edit employee details

Flag / Unflag employees

Delete (UI-ready)

Clickable tiles showing expanded employee details in popup

Smooth navigation back to tile view

Centralized Redux state management for:

Employee data

UI state (views, popups)

Pagination-ready structure

Plain CSS styling (framework-agnostic)

# Backend (Node.js + GraphQL)

GraphQL API built with Apollo Server

MongoDB database with Mongoose ODM

Employee fields:

id, name, age, class, subjects, attendance, flagged

GraphQL Queries:

Fetch all employees (pagination & sorting)

Fetch single employee by ID

GraphQL Mutations:

Add employee (Admin only)

Update employee (Admin only)

Flag / Unflag employee

Login (JWT-based authentication)

Role-based authorization (Admin / Employee)

Indexed fields and optimized queries for performance

Secure JWT authentication