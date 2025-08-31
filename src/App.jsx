import React, { useState, useCallback, useRef } from 'react';
import {
  Type,
  Image,
  MousePointer,
  Box,
  Columns,
  Layout,
  Trash2,
  Eye,
  Save,
  Undo,
  Redo,
  Settings,
  Smartphone,
  Tablet,
  Monitor,
  Plus
} from 'lucide-react';

// Component type definitions
const COMPONENT_TYPES = {
  TEXT: 'text',
  HEADING: 'heading',
  BUTTON: 'button',
  IMAGE: 'image',
  CONTAINER: 'container',
  COLUMNS: 'columns'
};

// Component library data
const COMPONENT_LIBRARY = [
  {
    id: 'text',
    type: COMPONENT_TYPES.TEXT,
    name: 'Text Block',
    icon: Type,
    category: 'Basic',
    defaultProps: {
      content: 'Your text here...',
      fontSize: '16px',
      color: '#333333',
      textAlign: 'left',
      fontWeight: 'normal',
      width: '100%',
      height: '40px',
      padding: '8px',
      margin: '8px'
    }
  },
  {
    id: 'heading',
    type: COMPONENT_TYPES.HEADING,
    name: 'Heading',
    icon: Type,
    category: 'Basic',
    defaultProps: {
      content: 'Your Heading',
      level: 'h2',
      fontSize: '32px',
      color: '#1a1a1a',
      textAlign: 'left',
      fontWeight: 'bold',
      width: '100%',
      height: '60px',
      padding: '16px',
      margin: '8px'
    }
  },
  {
    id: 'button',
    type: COMPONENT_TYPES.BUTTON,
    name: 'Button',
    icon: MousePointer,
    category: 'Basic',
    defaultProps: {
      text: 'Click Me',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '16px',
      href: '#',
      width: '200px',
      height: '45px'
    }
  },
  {
    id: 'image',
    type: COMPONENT_TYPES.IMAGE,
    name: 'Image',
    icon: Image,
    category: 'Media',
    defaultProps: {
      src: 'https://via.placeholder.com/300x200?text=Your+Image',
      alt: 'Image description',
      width: '300px',
      height: '200px',
      borderRadius: '0px',
      objectFit: 'cover'
    }
  },
  {
    id: 'container',
    type: COMPONENT_TYPES.CONTAINER,
    name: 'Container',
    icon: Box,
    category: 'Layout',
    defaultProps: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      minHeight: '100px',
      border: '2px dashed #dee2e6',
      width: '100%',
      height: '200px',
      margin: '8px'
    }
  },
  {
    id: 'columns',
    type: COMPONENT_TYPES.COLUMNS,
    name: '2 Columns',
    icon: Columns,
    category: 'Layout',
    defaultProps: {
      columnCount: 2,
      gap: '20px',
      backgroundColor: 'transparent',
      padding: '10px',
      width: '100%',
      height: '300px'
    }
  }
];

// Form field schemas for different component types
const COMPONENT_SCHEMAS = {
  [COMPONENT_TYPES.TEXT]: [
    { key: 'content', label: 'Content', type: 'textarea', group: 'Content' },
    { key: 'fontSize', label: 'Font Size', type: 'select', options: ['12px', '14px', '16px', '18px', '20px', '24px'], group: 'Style' },
    { key: 'color', label: 'Text Color', type: 'color', group: 'Style' },
    { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'], group: 'Style' },
    { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', '300', '400', '500', '600', '700'], group: 'Style' },
    { key: 'width', label: 'Width', type: 'range', min: 50, max: 100, unit: '%', group: 'Size' },
    { key: 'height', label: 'Height', type: 'range', min: 20, max: 200, unit: 'px', group: 'Size' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 50, unit: 'px', group: 'Size' },
    { key: 'margin', label: 'Margin', type: 'range', min: 0, max: 50, unit: 'px', group: 'Size' }
  ],
  [COMPONENT_TYPES.HEADING]: [
    { key: 'content', label: 'Heading Text', type: 'text', group: 'Content' },
    { key: 'level', label: 'Heading Level', type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], group: 'Content' },
    { key: 'fontSize', label: 'Font Size', type: 'select', options: ['18px', '24px', '32px', '40px', '48px', '56px'], group: 'Style' },
    { key: 'color', label: 'Color', type: 'color', group: 'Style' },
    { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'], group: 'Style' },
    { key: 'width', label: 'Width', type: 'range', min: 30, max: 100, unit: '%', group: 'Size' },
    { key: 'height', label: 'Height', type: 'range', min: 30, max: 150, unit: 'px', group: 'Size' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 50, unit: 'px', group: 'Size' },
    { key: 'margin', label: 'Margin', type: 'range', min: 0, max: 50, unit: 'px', group: 'Size' }
  ],
  [COMPONENT_TYPES.BUTTON]: [
    { key: 'text', label: 'Button Text', type: 'text', group: 'Content' },
    { key: 'href', label: 'Link URL', type: 'url', group: 'Content' },
    { key: 'backgroundColor', label: 'Background Color', type: 'color', group: 'Style' },
    { key: 'color', label: 'Text Color', type: 'color', group: 'Style' },
    { key: 'fontSize', label: 'Font Size', type: 'select', options: ['12px', '14px', '16px', '18px', '20px'], group: 'Style' },
    { key: 'borderRadius', label: 'Border Radius', type: 'select', options: ['0px', '4px', '8px', '12px', '16px', '24px'], group: 'Style' },
    { key: 'width', label: 'Width', type: 'range', min: 80, max: 400, unit: 'px', group: 'Size' },
    { key: 'height', label: 'Height', type: 'range', min: 25, max: 80, unit: 'px', group: 'Size' },
    { key: 'padding', label: 'Padding', type: 'range', min: 5, max: 30, unit: 'px', group: 'Size' }
  ],
  [COMPONENT_TYPES.IMAGE]: [
    { key: 'src', label: 'Image URL', type: 'url', group: 'Content' },
    { key: 'alt', label: 'Alt Text', type: 'text', group: 'Content' },
    { key: 'borderRadius', label: 'Border Radius', type: 'select', options: ['0px', '4px', '8px', '12px', '16px'], group: 'Style' },
    { key: 'width', label: 'Width', type: 'range', min: 50, max: 800, unit: 'px', group: 'Size' },
    { key: 'height', label: 'Height', type: 'range', min: 50, max: 600, unit: 'px', group: 'Size' },
    { key: 'objectFit', label: 'Image Fit', type: 'select', options: ['cover', 'contain', 'fill', 'scale-down'], group: 'Style' }
  ],
  [COMPONENT_TYPES.CONTAINER]: [
    { key: 'backgroundColor', label: 'Background Color', type: 'color', group: 'Style' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 100, unit: 'px', group: 'Style' },
    { key: 'borderRadius', label: 'Border Radius', type: 'select', options: ['0px', '4px', '8px', '12px', '16px'], group: 'Style' },
    { key: 'width', label: 'Width', type: 'range', min: 20, max: 100, unit: '%', group: 'Size' },
    { key: 'height', label: 'Height', type: 'range', min: 50, max: 800, unit: 'px', group: 'Size' },
    { key: 'margin', label: 'Margin', type: 'range', min: 0, max: 50, unit: 'px', group: 'Size' }
  ],
  [COMPONENT_TYPES.COLUMNS]: [
    { key: 'columnCount', label: 'Columns', type: 'select', options: [1, 2, 3, 4], group: 'Layout' },
    { key: 'gap', label: 'Gap', type: 'select', options: ['10px', '20px', '30px', '40px'], group: 'Layout' },
    { key: 'backgroundColor', label: 'Background', type: 'color', group: 'Style' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 60, unit: 'px', group: 'Style' },
    { key: 'width', label: 'Width', type: 'range', min: 30, max: 100, unit: '%', group: 'Size' },
    { key: 'height', label: 'Height', type: 'range', min: 100, max: 800, unit: 'px', group: 'Size' }
  ]
};

const DragAndDropBuilder = () => {
  // Main state
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZone, setDropZone] = useState(null);
  const [viewport, setViewport] = useState('desktop');
  const [showPreview, setShowPreview] = useState(false);
  const dragCounter = useRef(0);

  // Generate unique ID
  const generateId = () => `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Drag handlers
  const handleDragStart = (e, componentData) => {
    setDraggedItem(componentData);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(componentData));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    setDropZone('canvas');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDropZone(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDropZone(null);

    try {
      const componentData = JSON.parse(e.dataTransfer.getData('text/plain'));
      const newComponent = {
        id: generateId(),
        type: componentData.type,
        props: { ...componentData.defaultProps }
      };

      setComponents(prev => [...prev, newComponent]);
      setSelectedComponent(newComponent.id);
      setDraggedItem(null);
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
      setDraggedItem(null);
    }
  };

  // Component management
  const updateComponent = (id, updates) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, props: { ...comp.props, ...updates } } : comp
      )
    );
  };

  const deleteComponent = (id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const selectComponent = (id) => {
    setSelectedComponent(id);
  };

  // Component renderers
  const renderComponent = (component) => {
    const { type, props, id } = component;
    const isSelected = selectedComponent === id;

    const baseStyles = {
      cursor: 'pointer',
      position: 'relative',
      outline: isSelected ? '2px solid #3b82f6' : 'none',
      outlineOffset: '2px',
      marginBottom: '16px'
    };

    const handleClick = (e) => {
      e.stopPropagation();
      selectComponent(id);
    };

    switch (type) {
      case COMPONENT_TYPES.TEXT:
        return (
          <div
            key={id}
            onClick={handleClick}
            style={{
              ...baseStyles,
              fontSize: props.fontSize,
              color: props.color,
              textAlign: props.textAlign,
              fontWeight: props.fontWeight,
              padding: props.padding || '8px',
              margin: props.margin || '8px',
              width: props.width || '100%',
              height: props.height || 'auto',
              minHeight: '20px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {props.content}
            {isSelected && <ComponentControls componentId={id} onDelete={deleteComponent} />}
          </div>
        );

      case COMPONENT_TYPES.HEADING:
        const HeadingTag = props.level || 'h2';
        return (
          <HeadingTag
            key={id}
            onClick={handleClick}
            style={{
              ...baseStyles,
              fontSize: props.fontSize,
              color: props.color,
              textAlign: props.textAlign,
              fontWeight: props.fontWeight,
              margin: props.margin || '8px',
              padding: props.padding || '16px',
              width: props.width || '100%',
              height: props.height || 'auto',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {props.content}
            {isSelected && <ComponentControls componentId={id} onDelete={deleteComponent} />}
          </HeadingTag>
        );

      case COMPONENT_TYPES.BUTTON:
        return (
          <div key={id} onClick={handleClick} style={{ ...baseStyles, display: 'inline-block', margin: '8px' }}>
            <button
              style={{
                backgroundColor: props.backgroundColor,
                color: props.color,
                padding: props.padding || '12px',
                borderRadius: props.borderRadius,
                fontSize: props.fontSize,
                border: 'none',
                cursor: 'pointer',
                width: props.width || '200px',
                height: props.height || '45px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {props.text}
            </button>
            {isSelected && <ComponentControls componentId={id} onDelete={deleteComponent} />}
          </div>
        );

      case COMPONENT_TYPES.IMAGE:
        return (
          <div key={id} onClick={handleClick} style={{ ...baseStyles, padding: '8px', display: 'inline-block' }}>
            <img
              src={props.src}
              alt={props.alt}
              style={{
                width: props.width || '300px',
                height: props.height || '200px',
                borderRadius: props.borderRadius,
                display: 'block',
                objectFit: props.objectFit || 'cover',
                boxSizing: 'border-box'
              }}
            />
            {isSelected && <ComponentControls componentId={id} onDelete={deleteComponent} />}
          </div>
        );

      case COMPONENT_TYPES.CONTAINER:
        return (
          <div
            key={id}
            onClick={handleClick}
            style={{
              ...baseStyles,
              backgroundColor: props.backgroundColor,
              padding: props.padding || '20px',
              borderRadius: props.borderRadius,
              minHeight: props.minHeight || '100px',
              border: '2px dashed #dee2e6',
              margin: props.margin || '8px',
              width: props.width || '100%',
              height: props.height || '200px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
              Container - Drop components here
            </div>
            {isSelected && <ComponentControls componentId={id} onDelete={deleteComponent} />}
          </div>
        );

      case COMPONENT_TYPES.COLUMNS:
        return (
          <div
            key={id}
            onClick={handleClick}
            style={{
              ...baseStyles,
              display: 'grid',
              gridTemplateColumns: `repeat(${props.columnCount}, 1fr)`,
              gap: props.gap,
              backgroundColor: props.backgroundColor,
              padding: props.padding,
              margin: '8px 0',
              border: '2px dashed #dee2e6',
              borderRadius: '8px',
              minHeight: '200px'
            }}
          >
            {Array.from({ length: props.columnCount }, (_, index) => (
              <div
                key={index}
                style={{
                  minHeight: '100px',
                  backgroundColor: '#f8f9fa',
                  border: '1px dashed #dee2e6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: '14px'
                }}
              >
                Column {index + 1}
              </div>
            ))}
            {isSelected && <ComponentControls componentId={id} onDelete={deleteComponent} />}
          </div>
        );

      default:
        return null;
    }
  };

  // Component controls
  const ComponentControls = ({ componentId, onDelete }) => (
    <div
      className="absolute -top-8 -right-2 bg-white border border-gray-300 rounded-md shadow-lg flex z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => onDelete(componentId)}
        className="p-1 text-red-500 hover:bg-red-50 rounded"
        title="Delete component"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  // Property form renderer
  const renderPropertyForm = () => {
    if (!selectedComponent) return null;

    const component = components.find(c => c.id === selectedComponent);
    if (!component) return null;

    const schema = COMPONENT_SCHEMAS[component.type] || [];
    const groupedFields = schema.reduce((acc, field) => {
      const group = field.group || 'General';
      if (!acc[group]) acc[group] = [];
      acc[group].push(field);
      return acc;
    }, {});

    const handleFieldChange = (key, value) => {
      updateComponent(selectedComponent, { [key]: value });
    };

    const renderField = (field) => {
      const value = component.props[field.key] || '';

      switch (field.type) {
        case 'text':
        case 'url':
          return (
            <input
              type={field.type === 'url' ? 'url' : 'text'}
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={field.placeholder}
            />
          );

        case 'textarea':
          return (
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              placeholder={field.placeholder}
            />
          );

        case 'select':
          return (
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );

        case 'color':
          return (
            <div className="flex space-x-2">
              <input
                type="color"
                value={value}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          );

        case 'range':
          const numValue = typeof value === 'string' ? parseInt(value) || field.min : value;
          return (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  value={numValue}
                  onChange={(e) => handleFieldChange(field.key, `${e.target.value}${field.unit || ''}`)}
                  className="flex-1 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent min-w-[60px]">
                  {numValue}{field.unit || ''}
                </span>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-l border-purple-200 w-80 overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Properties</h3>
              <p className="text-purple-100 text-sm">
                {COMPONENT_LIBRARY.find(c => c.type === component.type)?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {Object.entries(groupedFields).map(([groupName, fields], groupIndex) => {
            const groupColors = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500',
              'from-green-500 to-emerald-500'
            ];
            const groupColor = groupColors[groupIndex % groupColors.length];
            
            return (
              <div key={groupName} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className={`text-sm font-bold mb-4 pb-2 border-b bg-gradient-to-r ${groupColor} bg-clip-text text-transparent`}>
                  {groupName}
                </h4>
                <div className="space-y-4">
                  {fields.map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        {renderField(field)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Toolbar */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-800 border-b border-purple-600 px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">🎨 Website Builder</h1>
              <p className="text-purple-200 text-sm">Drag, Drop & Design</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-purple-200 hover:text-white hover:bg-purple-700 rounded-lg transition-colors">
              <Undo className="w-4 h-4" />
            </button>
            <button className="p-2 text-purple-200 hover:text-white hover:bg-purple-700 rounded-lg transition-colors">
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Viewport selector */}
          <div className="flex bg-purple-900/50 rounded-xl p-1 backdrop-blur-sm">
            {[
              { key: 'mobile', icon: Smartphone, label: 'Mobile', color: 'from-green-400 to-emerald-500' },
              { key: 'tablet', icon: Tablet, label: 'Tablet', color: 'from-blue-400 to-cyan-500' },
              { key: 'desktop', icon: Monitor, label: 'Desktop', color: 'from-purple-400 to-pink-500' }
            ].map(({ key, icon: Icon, label, color }) => (
              <button
                key={key}
                onClick={() => setViewport(key)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewport === key
                    ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                    : 'text-purple-300 hover:text-white hover:bg-purple-700'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={() => setShowPreview(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Component Library Sidebar */}
        <div className="bg-gradient-to-b from-indigo-900 to-purple-900 border-r border-purple-600 w-64 overflow-y-auto shadow-2xl">
          <div className="p-4 border-b border-purple-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Components</h2>
            </div>
          </div>

          <div className="p-4">
            {Object.values(
              COMPONENT_LIBRARY.reduce((acc, comp) => {
                if (!acc[comp.category]) acc[comp.category] = [];
                acc[comp.category].push(comp);
                return acc;
              }, {})
            ).map((categoryComponents, categoryIndex) => {
              const categoryColors = [
                'from-blue-400 to-cyan-400',
                'from-purple-400 to-pink-400',
                'from-green-400 to-emerald-400'
              ];
              const categoryColor = categoryColors[categoryIndex % categoryColors.length];
              
              return (
                <div key={categoryIndex} className="mb-6">
                  <h3 className={`text-sm font-bold mb-3 bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
                    {categoryComponents[0].category}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryComponents.map(component => (
                      <div
                        key={component.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, component)}
                        className="p-3 bg-gradient-to-br from-purple-800 to-indigo-800 rounded-xl border border-purple-600 hover:from-purple-700 hover:to-indigo-700 cursor-grab active:cursor-grabbing hover:border-purple-400 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <component.icon className="w-5 h-5 text-purple-200 mb-2" />
                        <div className="text-xs text-purple-100 font-medium">
                          {component.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex">
          <div
            className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${
              dropZone === 'canvas' 
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
                : 'bg-gradient-to-br from-slate-800 to-purple-800'
            }`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => setSelectedComponent(null)}
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl border-2 transition-all duration-200 min-h-full p-8 ${
                dropZone === 'canvas' 
                  ? 'border-blue-400 border-dashed shadow-blue-500/25' 
                  : 'border-gray-200 shadow-purple-900/25'
              } ${
                viewport === 'mobile' ? 'max-w-sm mx-auto' :
                viewport === 'tablet' ? 'max-w-2xl mx-auto' :
                'max-w-6xl mx-auto'
              }`}
            >
              {components.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Layout className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    Start Building Your Website
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Drag components from the sidebar to get started
                  </p>
                  <div className="mt-6 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {components.map(component => renderComponent(component))}
                </div>
              )}
            </div>
          </div>

          {/* Property Panel */}
          {selectedComponent && renderPropertyForm()}
        </div>
      </div>
    </div>
  );
};

export default DragAndDropBuilder;