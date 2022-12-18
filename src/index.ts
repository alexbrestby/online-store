import './global.css';
import { categoryFilter } from './components/category-filter/index';
import { brandFilter } from './components/brand-filter/index';
import { getFilteredFormData } from './services/form/getFilteredFormData';

categoryFilter();
brandFilter();
getFilteredFormData();
