/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { URI } from './uri.js';
import { posix, normalize } from './path.js';
import { startsWithIgnoreCase, rtrim } from './strings.js';
import { Schemas } from './network.js';
import { isLinux, isWindows } from './platform.js';
import { isEqual, basename, relativePath } from './resources.js';
import { hasDriveLetter, isRootOrDriveLetter } from './extpath.js';
/**
 * @deprecated use LabelService instead
 */
export function getPathLabel(resource, userHomeProvider, rootProvider) {
    if (typeof resource === 'string') {
        resource = URI.file(resource);
    }
    // return early if we can resolve a relative path label from the root
    if (rootProvider) {
        const baseResource = rootProvider.getWorkspaceFolder(resource);
        if (baseResource) {
            const hasMultipleRoots = rootProvider.getWorkspace().folders.length > 1;
            let pathLabel;
            if (isEqual(baseResource.uri, resource)) {
                pathLabel = ''; // no label if paths are identical
            }
            else {
                pathLabel = relativePath(baseResource.uri, resource);
            }
            if (hasMultipleRoots) {
                const rootName = baseResource.name ? baseResource.name : basename(baseResource.uri);
                pathLabel = pathLabel ? (rootName + ' • ' + pathLabel) : rootName; // always show root basename if there are multiple
            }
            return pathLabel;
        }
    }
    // return if the resource is neither file:// nor untitled:// and no baseResource was provided
    if (resource.scheme !== Schemas.file && resource.scheme !== Schemas.untitled) {
        return resource.with({ query: null, fragment: null }).toString(true);
    }
    // convert c:\something => C:\something
    if (hasDriveLetter(resource.fsPath)) {
        return normalize(normalizeDriveLetter(resource.fsPath));
    }
    // normalize and tildify (macOS, Linux only)
    let res = normalize(resource.fsPath);
    if (!isWindows && (userHomeProvider === null || userHomeProvider === void 0 ? void 0 : userHomeProvider.userHome)) {
        res = tildify(res, userHomeProvider.userHome.fsPath);
    }
    return res;
}
export function getBaseLabel(resource) {
    if (!resource) {
        return undefined;
    }
    if (typeof resource === 'string') {
        resource = URI.file(resource);
    }
    const base = basename(resource) || (resource.scheme === Schemas.file ? resource.fsPath : resource.path) /* can be empty string if '/' is passed in */;
    // convert c: => C:
    if (isWindows && isRootOrDriveLetter(base)) {
        return normalizeDriveLetter(base);
    }
    return base;
}
export function normalizeDriveLetter(path) {
    if (hasDriveLetter(path)) {
        return path.charAt(0).toUpperCase() + path.slice(1);
    }
    return path;
}
let normalizedUserHomeCached = Object.create(null);
export function tildify(path, userHome) {
    if (isWindows || !path || !userHome) {
        return path; // unsupported
    }
    // Keep a normalized user home path as cache to prevent accumulated string creation
    let normalizedUserHome = normalizedUserHomeCached.original === userHome ? normalizedUserHomeCached.normalized : undefined;
    if (!normalizedUserHome) {
        normalizedUserHome = `${rtrim(userHome, posix.sep)}${posix.sep}`;
        normalizedUserHomeCached = { original: userHome, normalized: normalizedUserHome };
    }
    // Linux: case sensitive, macOS: case insensitive
    if (isLinux ? path.startsWith(normalizedUserHome) : startsWithIgnoreCase(path, normalizedUserHome)) {
        path = `~/${path.substr(normalizedUserHome.length)}`;
    }
    return path;
}
