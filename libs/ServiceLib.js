/*
  ServiceLib - Service Manager Library
  Bobby SMM Robot | Bots.Business compatible
  
  Handles storing, retrieving, searching, and mapping
  SMM panel services fetched via action=services API.
  
  Storage keys:
    SM_service_ids        → JSON array of all service IDs
    SM_svc_{id}           → JSON object per service
    SM_mappings           → JSON object of key→serviceId maps
*/

let SM_PREFIX    = "SM_svc_";
let SM_INDEX_KEY = "SM_service_ids";
let SM_MAPS_KEY  = "SM_mappings";

// ------------------------------------------------------------------
// Save all services returned by the API (array of service objects)
// Each item must have at least: service (id), name, category, rate, min, max, type
// Returns: number of services saved
// ------------------------------------------------------------------
let saveAllServices = function(servicesArray) {
  if (!servicesArray || !Array.isArray(servicesArray)) { return 0; }

  let ids   = [];
  let count = 0;

  for (let i = 0; i < servicesArray.length; i++) {
    let svc = servicesArray[i];
    if (!svc || !svc.service) { continue; }

    let record = {
      id:       String(svc.service),
      name:     svc.name     || "",
      category: svc.category || "",
      rate:     svc.rate     || "0",
      min:      svc.min      || "0",
      max:      svc.max      || "0",
      type:     svc.type     || ""
    };

    Bot.setProperty(SM_PREFIX + record.id, record, "json");
    ids.push(record.id);
    count++;
  }

  Bot.setProperty(SM_INDEX_KEY, ids, "json");
  return count;
};

// ------------------------------------------------------------------
// Get a single service record by ID
// Returns: {id, name, category, rate, min, max, type} or null
// ------------------------------------------------------------------
let getService = function(serviceId) {
  return Bot.getProperty(SM_PREFIX + String(serviceId)) || null;
};

// ------------------------------------------------------------------
// Get the array of all stored service IDs
// ------------------------------------------------------------------
let getAllIds = function() {
  return Bot.getProperty(SM_INDEX_KEY) || [];
};

// ------------------------------------------------------------------
// Get total number of stored services
// ------------------------------------------------------------------
let getCount = function() {
  return getAllIds().length;
};

// ------------------------------------------------------------------
// Search services by name, category, or exact ID
// query  : string to match (case-insensitive)
// limit  : max results to return (default 10)
// Returns: array of matching service records
// ------------------------------------------------------------------
let searchServices = function(query, limit) {
  if (!query) { return []; }
  if (!limit)  { limit = 10; }

  let ids     = getAllIds();
  let results = [];
  let q       = query.toLowerCase().trim();

  for (let i = 0; i < ids.length; i++) {
    let svc = getService(ids[i]);
    if (!svc) { continue; }

    let idMatch   = String(svc.id) === q;
    let nameMatch = svc.name     && svc.name.toLowerCase().indexOf(q)     !== -1;
    let catMatch  = svc.category && svc.category.toLowerCase().indexOf(q) !== -1;

    if (idMatch || nameMatch || catMatch) {
      results.push(svc);
      if (results.length >= limit) { break; }
    }
  }

  return results;
};

// ------------------------------------------------------------------
// Mappings: internal key  →  API service ID
// Use to link your bot commands (e.g. "ytviews") to a service ID
// ------------------------------------------------------------------
let getAllMappings = function() {
  return Bot.getProperty(SM_MAPS_KEY) || {};
};

let setMapping = function(mapKey, serviceId) {
  let maps = getAllMappings();
  maps[String(mapKey)] = String(serviceId);
  Bot.setProperty(SM_MAPS_KEY, maps, "json");
};

let getMapping = function(mapKey) {
  let maps = getAllMappings();
  return maps[String(mapKey)] || null;
};

let removeMapping = function(mapKey) {
  let maps = getAllMappings();
  delete maps[String(mapKey)];
  Bot.setProperty(SM_MAPS_KEY, maps, "json");
};

// ------------------------------------------------------------------
// Publish public API
// ------------------------------------------------------------------
publish({
  saveAllServices: saveAllServices,
  getService:      getService,
  getAllIds:        getAllIds,
  getCount:        getCount,
  searchServices:  searchServices,
  getAllMappings:   getAllMappings,
  setMapping:      setMapping,
  getMapping:      getMapping,
  removeMapping:   removeMapping
});
