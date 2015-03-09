﻿angular.module('sfServices')
    .factory('sfRolesService', ['serviceHelper', 'serverContext',
    function (serviceHelper, serverContext) {
        var serviceUrl = serverContext.getRootedUrl('Sitefinity/Services/Security/Roles.svc/');
        var identifierField = 'Name';

        function getResource (itemId) {
            var url = serviceUrl;
            if (itemId && itemId !== serviceHelper.emptyGuid()) {
                url = url + itemId + '/';
            }

            return serviceHelper.getResource(url);
        }

        function getRoles (provider, skip, take, search, rolesToHide) {
            var filter = serviceHelper.filterBuilder()
                    .searchFilter(search, null, identifierField)
                    .and()
                    .differFilter(rolesToHide, identifierField)
                    .getFilter();

            return getResource().get({
                provider: provider,
                skip: skip,
                take: take,
                filter: filter
            })
            .$promise;
        }

        function getRole (id, provider) {
            return getResource(id).get({
                provider: provider
            })
            .$promise;
        }

        function getSpecificRoles (ids, provider) {
            var filter = serviceHelper.filterBuilder()
                    .specificItemsFilter(ids)
                    .getFilter();

            return getResource().get({
                provider: provider,
                filter: filter
            })
            .$promise;
        }

        function getRoleProviders (commaSeperatedAbilities) {
            var endpoint = 'GetRoleProviders';
            var url = serviceUrl + endpoint + '/';

            return serviceHelper.getResource(url).get({
                abilities: commaSeperatedAbilities,
                addAppRoles: true
            })
            .$promise;
        }

        return {
            getRoles: getRoles,
            getRole: getRole,
            getSpecificRoles: getSpecificRoles,
            getRoleProviders: getRoleProviders
        };
}]);