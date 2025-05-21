import React from "react";

interface FilterComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
}) => {
  return (
    <div className="flex me-auto">
      <input className="form-input" type="text" placeholder="Search blog..." value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select className="form-select" value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}>
        <option disabled>Status</option>
        <option value="all">All</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <select
        className="form-select"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option disabled>Categories</option>
        <option value="all">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
