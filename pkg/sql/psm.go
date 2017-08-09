// Copyright 2017 The Cockroach Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

package sql

import (
	"github.com/cockroachdb/cockroach/pkg/sql/pgwire/pgerror"
	"golang.org/x/net/context"

	"github.com/cockroachdb/cockroach/pkg/sql/parser"
)

// CreateFunction creates a persistent function.
// Privileges: None.
func (p *planner) CreateFunction(ctx context.Context, n *parser.CreateFunction) (planNode, error) {
	return nil, pgerror.Unimplemented(`create-function`, "CREATE FUNCTION is not implemented")
}

// CreateProcedure creates a persistent stored procedure.
// Privileges: None.
func (p *planner) CreateProcedure(ctx context.Context, n *parser.CreateProcedure) (planNode, error) {
	return nil, pgerror.Unimplemented(`create-procedure`, "CREATE PROCEDURE is not implemented")
}
