Package.describe({
  name: 'kostanos:meteor-collection-field-history',
  version: '1.0.0',
  summary: 'Save history of chosen fields on selected collections',
  git: 'https://github.com/Kostanos/meteor-collection-field-history.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(['underscore', 'check', 'matb33:collection-hooks@0.7.6']);
  api.versionsFrom('1.0.4.2');

  api.addFiles('index.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('benoitt:intl');
});