import React from "react";
import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  useMemo
} from "react";
import { createRoot } from "react-dom/client";

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { usePagination, useSearchBox, InstantSearch, } from "react-instantsearch";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js"
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import {
  INSTANT_SEARCH_QUERY_SUGGESTIONS
} from "../utils/constants";

import "@algolia/autocomplete-theme-classic";
import { INSTANT_SEARCH_INDEX_NAME } from "../utils/constants"
import { Link } from "gatsby"
import { Linkify } from "../utils/linkify"
import styled from "@emotion/styled"

const searchClient = algoliasearch( process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY);

const SearchItemWrapper = styled.div`
  border-bottom: solid 1px rgba(0,0,0,0.1);
  padding: 0.25rem 0.25rem 1rem 0.25rem;
    
    & > a {
        text-decoration: none;
    }
`

export const Autocomplete = ({
                               className,
                               ...autocompleteProps
                             }) => {
  const autocompleteContainer = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] = useState({ query });


  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      getSources() {
        return [
          {
            sourceId: 'autocomplete_results',
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: INSTANT_SEARCH_INDEX_NAME,
                    query,
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/episode/${item.objectID}`;
            },
            templates: {
              item({ item, components}) {
                return(
                  <SearchItemWrapper>
                  <Link to={`/${Linkify(item.name)}`}>
                    <h3>{components.Highlight({
                      hit: item,
                      attribute:
                        "name",
                      tagName: "mark",
                    })}</h3>
                    <p>{components.Snippet({
                      hit: item,
                      attribute:
                        "description",
                      tagName: "mark",
                    })}</p>
                  </Link>
                  </SearchItemWrapper>
                )
              },
            },
          },
        ];
      },
      onReset() {
        setInstantSearchUiState({ query: "" })
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query
          });
        }
      },
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },

    });

    return () => autocompleteInstance.destroy();
  }, []);

  return <div className={className} ref={autocompleteContainer} />;
}

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName={INSTANT_SEARCH_INDEX_NAME} routing>
      <Autocomplete searchClient={searchClient}
                    placeholder="Search episodes"
                    detachedMediaQuery="none"
                    openOnFocus />
    </InstantSearch>
    )
}