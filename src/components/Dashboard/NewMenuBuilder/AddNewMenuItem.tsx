import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store/store';
import { fetchCategories } from '../../../slices/categorySlice';
import { fetchModifierGroups } from '../../../slices/modifierSlice';
import { createMenuItem, CreateMenuItemPayload } from '../../../slices/newMenuSlice';
import LayoutComponent from '../../Overview/Layout/LayoutComponent';
import ReusableDropdown, { OptionItem } from './components/ReusableDropdown';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import { Loader2, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState, useRef } from 'react';

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-gray-200 last:border-0">
    <div className="md:col-span-3">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
    </div>
    <div className="md:col-span-9 space-y-6">
      {children}
    </div>
  </div>
);

export default function AddMenuItem() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch data from Redux
  const { categories } = useSelector((state: RootState) => state.category);
  const { modifierGroups } = useSelector((state: RootState) => state.modifier);
  const { loading: creating } = useSelector((state: RootState) => state.menuItem);

  // Form State
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OptionItem | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<OptionItem | null>(null);
  const [prepTime, setPrepTime] = useState('');
  const [selectedStation, setSelectedStation] = useState<OptionItem | null>(null);
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<OptionItem | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchModifierGroups());
  }, [dispatch]);

  // Map categories to OptionItem format
  const categoryOptions: OptionItem[] = categories.map((cat: any) => ({
    label: cat.name,
    id: cat.id,
  }));

  // Derive subcategories based on selected category
  const subCategoryOptions: OptionItem[] = useMemo(() => {
    if (!selectedCategory) return [];
    const category = categories.find((cat: any) => cat.id === selectedCategory.id);
    return category?.subcategories?.map((sub: any) => ({
      label: sub.name,
      id: sub.name, // Using name as ID for subcategories since they don't have IDs in the interface
    })) || [];
  }, [selectedCategory, categories]);

  // Handle category change
  const handleCategoryChange = (val: OptionItem | null) => {
    setSelectedCategory(val);
    setSelectedSubCategory(null); // Reset subcategory when category changes
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Map modifier groups to { label, value } format for MultiSelectDropdown
  const modifierOptions = modifierGroups.map((group) => ({
    label: group.name,
    value: group.id,
  }));

  const handleSave = async () => {
    if (!itemName || !selectedCategory || !basePrice) {
      // Basic validation
      return;
    }

    // Map selected modifiers back to full structure
    const mappedModifierGroups = selectedModifiers.map(id => {
      const group = modifierGroups.find(g => g.id === id);
      return {
        modifier_group_id: id,
        name: group?.name || '',
        description: group?.description || '',
        sort_order: group?.sort_order || 0,
        is_active: group?.is_active ?? true,
        required: false, // Default to false if not specified in current state
        min_selections: group?.min_selections || 0,
        max_selections: group?.max_selections || 0,
        modifiers: group?.modifiers?.map(m => ({
          name: m.name,
          price_delta: m.price_delta || '0.00',
          sort_order: m.sort_order || 0,
          is_active: m.is_active ?? true,
        })) || [],
      };
    });

    const payload: CreateMenuItemPayload = {
      name: itemName,
      is_active: true,
      sort_order: 0,
      all_locations: true,
      category_id: selectedCategory.id,
      subcategory_id: undefined, // Subcategory ID is not used currently, we use sub category name or we can map it if we had IDs
      station_id: selectedStation?.id,
      modifier_groups: mappedModifierGroups,
      variants: [], // Implement variants in next step
      auto_generate_variations: true,
      default_variation: {
        price: basePrice,
        sku: 'itemName',
        is_taxable: false,
        tax_ids: [],
      },
    };

    const resultAction = await dispatch(createMenuItem(payload));
    if (createMenuItem.fulfilled.match(resultAction)) {
      navigate('/menu-list');
    }
  };

  return (
    <LayoutComponent title="Menu Item" description="Create a new item for your menu." HeaderAction={
      <div className="flex gap-3">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-fit"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="min-w-fit px-4 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-lg hover:bg-[#1e293b] flex items-center gap-2"
          onClick={handleSave}
          disabled={creating}
        >
          {creating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save changes'
          )}
        </button>
      </div>
    }>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <FormSection title="Basics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Item name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g Cheese"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
              />
            </div>
            <div className='overflow-x-hidden'>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Menu category <span className="text-red-500">*</span>
              </label>
              <ReusableDropdown
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Search category"
                buttonLabel="Select category"
                width={220}
              />
            </div>
          </div>

          {selectedCategory && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='overflow-x-hidden'>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Sub category <span className="text-red-500">*</span>
              </label>
              <ReusableDropdown
                options={subCategoryOptions}
                value={selectedSubCategory}
                onChange={setSelectedSubCategory}
                placeholder="Search sub category"
                buttonLabel="Select sub category"
                width={220}
              // disabled={!selectedCategory}
              />
            </div>
          </div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Prep Time (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
              />
            </div>

            <div className='overflow-x-hidden'>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Station (Optional)
              </label>
              <ReusableDropdown
                options={[]} // TODO: Fetch stations when available
                value={selectedStation}
                onChange={setSelectedStation}
                placeholder="Search station"
                buttonLabel="Select station"
                width={220}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Item image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 overflow-hidden relative"
                onClick={handleImageClick}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-lg hover:bg-[#1e293b] flex items-center gap-2"
                onClick={handleImageClick}
              >
                <Plus className="w-4 h-4" />
                Upload image
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
            ></textarea>
          </div>
        </FormSection>

        <FormSection title="Pricing">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Base price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="w-52 px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
            />
          </div>
        </FormSection>

        <FormSection title="Variants">
          <ReusableDropdown
            options={[]} // TODO: Fetch variants when available
            value={selectedVariant}
            onChange={setSelectedVariant}
            placeholder="Search variant"
            buttonLabel="Select variant"
            width={220}
          />
        </FormSection>

        <FormSection title="Modifiers">
          <MultiSelectDropdown
            options={modifierOptions}
            selectedValues={selectedModifiers}
            onChange={setSelectedModifiers}
            placeholder="Search modifier"
            width={220}
          />
        </FormSection>

        <FormSection title="Additionals">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Tags</label>
            <p className="text-sm text-gray-500 mb-2">Add searchable tags like "spicy", "bestseller", "new"</p>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
            />
          </div>
        </FormSection>
      </div>
    </LayoutComponent>
  );
}


