/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Command from './Command'

class Group extends Command {
  constructor(helpers) {
    super()
    this.helpers = helpers
  }

  isApplicableForGroup(group) {
    return this.helpers.reduce((acc, cmd) => {
      return acc && cmd.isApplicableForGroup(group)
    }, true)
  }

  apply(node, key) {
    return this.helpers.reduce((acc, cmd) => {
      const r = cmd.apply(node, key)
      if (r === false) {
        return acc
      }
      return acc.concat(r)
    }, [])
  }
}

export default Group
